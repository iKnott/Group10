import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building, ClipboardList, PieChart, Play } from "lucide-react";
import { useLocation } from "wouter";

export default function Welcome() {
  const [, setLocation] = useLocation();

  const startAssessment = () => {
    setLocation("/quiz");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="shadow-lg border border-border">
          <CardContent className="p-8 lg:p-12">
            <div className="mb-8">
              <Building className="h-16 w-16 text-primary mb-4 mx-auto" data-testid="building-icon" />
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Company Culture Assessment
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Discover which of the 8 core culture types defines your organization
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-secondary/50 rounded-lg p-6">
                <ClipboardList className="h-8 w-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">18 Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Workplace scenarios designed to reveal your company's true culture
                </p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-6">
                <PieChart className="h-8 w-8 text-accent mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">8 Culture Types</h3>
                <p className="text-sm text-muted-foreground">
                  Caring, Purpose, Learning, Enjoyment, Results, Authority, Safety, Order
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={startAssessment} 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold w-full md:w-auto"
                data-testid="button-start-assessment"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Assessment
              </Button>
              <p className="text-sm text-muted-foreground">
                Takes approximately 5-7 minutes to complete
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
