import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Download, Share, RotateCcw, Check, ArrowUp } from "lucide-react";
import { useLocation } from "wouter";
import { useParams } from "wouter";
import { cultureData } from "@/lib/culture-data";
import type { Assessment, CultureType } from "@shared/schema";

export default function Results() {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();

  const { data: assessment, isLoading } = useQuery<Assessment>({
    queryKey: ["/api/assessments", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading results...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">Assessment not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Find the dominant culture (highest score)
  const cultureEntries = Object.entries(assessment.results) as [CultureType, number][];
  const dominantCultureEntry = cultureEntries.reduce((max, current) => 
    current[1] > max[1] ? current : max
  );
  const [dominantCultureType, dominantScore] = dominantCultureEntry;
  const dominantCulture = cultureData[dominantCultureType];

  // Sort all cultures by score for the breakdown
  const sortedCultures = cultureEntries.sort((a, b) => b[1] - a[1]);

  const getCultureIcon = (cultureType: CultureType) => {
    const iconMap = {
      caring: "❤️",
      purpose: "🎯", 
      learning: "🎓",
      enjoyment: "😊",
      results: "📈",
      authority: "👑",
      safety: "🛡️",
      order: "📋"
    };
    return iconMap[cultureType];
  };

  const restartAssessment = () => {
    setLocation("/");
  };

  const downloadResults = () => {
    // TODO: Implement PDF generation
    alert("Download functionality would be implemented here with PDF generation");
  };

  const shareResults = () => {
    // TODO: Implement sharing functionality
    if (navigator.share) {
      navigator.share({
        title: "My Company Culture Assessment Results",
        text: `My company has a ${dominantCulture.name} with a score of ${dominantScore}%`,
        url: window.location.href
      });
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href);
      alert("Results link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Card className="shadow-sm border border-border">
            <CardContent className="p-8">
              <Trophy className="h-16 w-16 text-accent mb-4 mx-auto" data-testid="trophy-icon" />
              <h1 className="text-4xl font-bold mb-4">Assessment Complete!</h1>
              <p className="text-xl text-muted-foreground">
                Your company's dominant culture type has been identified
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Primary Result */}
        <Card className="shadow-sm mb-8 border border-border">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
                <span className="text-3xl" data-testid="dominant-culture-icon">
                  {getCultureIcon(dominantCultureType)}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2" data-testid="dominant-culture-name">
                {dominantCulture.name}
              </h2>
              <div className="text-lg text-muted-foreground mb-4" data-testid="dominant-culture-score">
                Score: {dominantScore}%
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-secondary/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-3">What This Means</h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="culture-description">
                  {dominantCulture.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-accent">Strengths</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground" data-testid="culture-strengths">
                    {dominantCulture.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-accent mr-2 mt-0.5 h-3 w-3 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Growth Areas</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground" data-testid="culture-growth-areas">
                    {dominantCulture.growthAreas.map((area, index) => (
                      <li key={index} className="flex items-start">
                        <ArrowUp className="text-primary mr-2 mt-0.5 h-3 w-3 flex-shrink-0" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Breakdown */}
        <Card className="shadow-sm border border-border">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Complete Culture Breakdown</h3>
            
            <div className="grid gap-4" data-testid="culture-breakdown">
              {sortedCultures.map(([cultureType, score]) => {
                const culture = cultureData[cultureType];
                return (
                  <div 
                    key={cultureType} 
                    className="flex items-center p-4 bg-secondary/20 rounded-lg"
                    data-testid={`culture-${cultureType}`}
                  >
                    <div className="flex items-center flex-1">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <span className="text-lg">{getCultureIcon(cultureType)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold" data-testid={`text-${cultureType}-name`}>
                            {culture.name.replace(" Culture", "")}
                          </span>
                          <span className="text-sm text-muted-foreground" data-testid={`text-${cultureType}-score`}>
                            {score}%
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${score}%` }}
                            data-testid={`progress-${cultureType}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={downloadResults}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3"
              data-testid="button-download"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button
              onClick={shareResults}
              variant="secondary"
              className="px-6 py-3"
              data-testid="button-share"
            >
              <Share className="mr-2 h-4 w-4" />
              Share Results
            </Button>
            <Button
              onClick={restartAssessment}
              variant="outline"
              className="px-6 py-3"
              data-testid="button-restart"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Take Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
