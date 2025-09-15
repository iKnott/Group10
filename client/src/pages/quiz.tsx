import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { useLocation } from "wouter";
import { ProgressBar } from "@/components/progress-bar";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Question } from "@shared/schema";

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: questions, isLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions"],
  });

  const submitAssessmentMutation = useMutation({
    mutationFn: async (responses: Record<string, string>) => {
      const response = await apiRequest("POST", "/api/assessments", { responses });
      return response.json();
    },
    onSuccess: (assessment) => {
      queryClient.invalidateQueries({ queryKey: ["/api/assessments"] });
      setLocation(`/results/${assessment.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit assessment. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">No questions available.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      toast({
        title: "Answer Required",
        description: "Please select an answer before continuing.",
        variant: "destructive",
      });
      return;
    }

    // Store the response
    const newResponses = { ...responses, [currentQuestion.id]: selectedAnswer };
    setResponses(newResponses);

    if (isLastQuestion) {
      // Submit assessment
      submitAssessmentMutation.mutate(newResponses);
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Reset selected answer for next question
      const nextQuestionId = questions[currentQuestionIndex + 1].id;
      setSelectedAnswer(newResponses[nextQuestionId] || "");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevQuestionId = questions[currentQuestionIndex - 1].id;
      setSelectedAnswer(responses[prevQuestionId] || "");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <Card className="shadow-sm mb-6 border border-border">
          <CardContent className="p-6">
            <ProgressBar 
              current={currentQuestionIndex + 1} 
              total={questions.length} 
            />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="shadow-sm border border-border">
          <CardContent className="p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 leading-relaxed" data-testid="question-text">
                {currentQuestion.text}
              </h3>
              <div className="text-sm text-muted-foreground flex items-center">
                <Lightbulb className="mr-2 h-4 w-4" />
                Select the option that best reflects your organization's typical response
              </div>
            </div>

            <RadioGroup 
              value={selectedAnswer} 
              onValueChange={handleAnswerChange}
              className="space-y-4 mb-8"
              data-testid="answer-options"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={option.value} className="flex items-start p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1 mr-4" />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div className="font-medium mb-1">{option.text}</div>
                    <div className="text-sm text-muted-foreground">{option.subtitle}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                data-testid="button-previous"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={submitAssessmentMutation.isPending}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3"
                data-testid="button-next"
              >
                {submitAssessmentMutation.isPending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : null}
                <span data-testid="next-btn-text">
                  {isLastQuestion ? "View Results" : "Next Question"}
                </span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
