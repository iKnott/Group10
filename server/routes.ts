import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { type CultureResults, type CultureType } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all questions for the assessment
  app.get("/api/questions", async (req, res) => {
    try {
      const questions = await storage.getQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  // Submit assessment responses and get results
  app.post("/api/assessments", async (req, res) => {
    try {
      // Permissive validation to handle differing JSON parsers in hosting envs
      const allowedValues: ReadonlyArray<CultureType> = [
        "caring",
        "purpose",
        "learning",
        "enjoyment",
        "results",
        "authority",
        "safety",
        "order",
      ];

      const body = req.body as unknown;
      const responsesRaw = (body as any)?.responses;

      if (!responsesRaw || typeof responsesRaw !== "object" || Array.isArray(responsesRaw)) {
        res.status(400).json({ error: "Invalid request data", details: [{ path: ["responses"], message: "responses must be an object" }] });
        return;
      }

      const responses: Record<string, string> = {};
      for (const [key, value] of Object.entries(responsesRaw as Record<string, unknown>)) {
        const strVal = typeof value === "string" ? value : String(value);
        if (allowedValues.includes(strVal as CultureType)) {
          responses[key] = strVal;
        }
      }

      if (Object.keys(responses).length === 0) {
        res.status(400).json({ error: "Invalid request data", details: [{ path: ["responses"], message: "no valid responses provided" }] });
        return;
      }

      // Calculate culture results
      const results = calculateCultureResults(responses);
      const assessment = await storage.createAssessment({
        responses,
        results,
      });

      res.json(assessment);
    } catch (_error) {
      res.status(500).json({ error: "Failed to create assessment" });
    }
  });

  // Get assessment results by ID
  app.get("/api/assessments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const assessment = await storage.getAssessment(id);
      
      if (!assessment) {
        res.status(404).json({ error: "Assessment not found" });
        return;
      }

      res.json(assessment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch assessment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function calculateCultureResults(responses: Record<string, string>): CultureResults {
  // Initialize all culture types to 0
  const results: CultureResults = {
    caring: 0,
    purpose: 0,
    learning: 0,
    enjoyment: 0,
    results: 0,
    authority: 0,
    safety: 0,
    order: 0,
  };

  // Count responses for each culture type
  const responseValues = Object.values(responses) as CultureType[];
  responseValues.forEach(cultureType => {
    results[cultureType]++;
  });

  // Convert counts to percentages
  const totalResponses = responseValues.length;
  Object.keys(results).forEach(key => {
    results[key as CultureType] = Math.round((results[key as CultureType] / totalResponses) * 100);
  });

  return results;
}
