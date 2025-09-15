import { pgTable, text, varchar, jsonb, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const questions = pgTable("questions", {
  id: varchar("id").primaryKey(),
  text: text("text").notNull(),
  options: jsonb("options").$type<QuestionOption[]>().notNull(),
});

export const assessments = pgTable("assessments", {
  id: varchar("id").primaryKey(),
  responses: jsonb("responses").$type<Record<string, string>>().notNull(),
  results: jsonb("results").$type<CultureResults>().notNull(),
  completedAt: timestamp("completed_at").notNull(),
});

export const insertQuestionSchema = createInsertSchema(questions);
export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  completedAt: true,
});

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;

export interface QuestionOption {
  value: CultureType;
  text: string;
  subtitle: string;
}

export type CultureType = 
  | "caring" 
  | "purpose" 
  | "learning" 
  | "enjoyment" 
  | "results" 
  | "authority" 
  | "safety" 
  | "order";

export interface CultureResults {
  caring: number;
  purpose: number;
  learning: number;
  enjoyment: number;
  results: number;
  authority: number;
  safety: number;
  order: number;
}

export interface CultureInfo {
  name: string;
  icon: string;
  description: string;
  strengths: string[];
  growthAreas: string[];
  color: string;
}
