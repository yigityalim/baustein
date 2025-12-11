export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      group_members: {
        Row: {
          group_id: string | null
          id: string
          joined_at: string
          user_id: string | null
        }
        Insert: {
          group_id?: string | null
          id?: string
          joined_at?: string
          user_id?: string | null
        }
        Update: {
          group_id?: string | null
          id?: string
          joined_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          color: string | null
          content: string
          created_at: string
          group_id: string | null
          id: string
          is_pinned: boolean | null
          tags: string[] | null
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          color?: string | null
          content: string
          created_at?: string
          group_id?: string | null
          id?: string
          is_pinned?: boolean | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          color?: string | null
          content?: string
          created_at?: string
          group_id?: string | null
          id?: string
          is_pinned?: boolean | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          current_streak: number | null
          id: string
          last_study_date: string | null
          username: string | null
          xp: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          current_streak?: number | null
          id: string
          last_study_date?: string | null
          username?: string | null
          xp?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          current_streak?: number | null
          id?: string
          last_study_date?: string | null
          username?: string | null
          xp?: number | null
        }
        Relationships: []
      }
      sentences: {
        Row: {
          content: string
          created_at: string
          difficulty: number | null
          group_id: string | null
          hint: string | null
          id: string
          meaning_tr: string
          topic: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          difficulty?: number | null
          group_id?: string | null
          hint?: string | null
          id?: string
          meaning_tr: string
          topic: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          difficulty?: number | null
          group_id?: string | null
          hint?: string | null
          id?: string
          meaning_tr?: string
          topic?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sentences_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      study_groups: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          join_code: string
          name: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          join_code: string
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          join_code?: string
          name?: string
        }
        Relationships: []
      }
      vocabulary: {
        Row: {
          article: Database["public"]["Enums"]["article_type"] | null
          category: string | null
          conjugation: Json | null
          correct_count: number | null
          created_at: string
          example_sentence: string | null
          group_id: string | null
          id: string
          image_url: string | null
          last_practiced_at: string | null
          level: Database["public"]["Enums"]["mastery_level"] | null
          meaning_tr: string
          mistake_count: number | null
          plural: string | null
          tags: string[] | null
          type: Database["public"]["Enums"]["word_type"]
          updated_at: string
          user_id: string | null
          word: string
        }
        Insert: {
          article?: Database["public"]["Enums"]["article_type"] | null
          category?: string | null
          conjugation?: Json | null
          correct_count?: number | null
          created_at?: string
          example_sentence?: string | null
          group_id?: string | null
          id?: string
          image_url?: string | null
          last_practiced_at?: string | null
          level?: Database["public"]["Enums"]["mastery_level"] | null
          meaning_tr: string
          mistake_count?: number | null
          plural?: string | null
          tags?: string[] | null
          type?: Database["public"]["Enums"]["word_type"]
          updated_at?: string
          user_id?: string | null
          word: string
        }
        Update: {
          article?: Database["public"]["Enums"]["article_type"] | null
          category?: string | null
          conjugation?: Json | null
          correct_count?: number | null
          created_at?: string
          example_sentence?: string | null
          group_id?: string | null
          id?: string
          image_url?: string | null
          last_practiced_at?: string | null
          level?: Database["public"]["Enums"]["mastery_level"] | null
          meaning_tr?: string
          mistake_count?: number | null
          plural?: string | null
          tags?: string[] | null
          type?: Database["public"]["Enums"]["word_type"]
          updated_at?: string
          user_id?: string | null
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "vocabulary_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      word_progress: {
        Row: {
          correct_count: number | null
          id: string
          last_practiced_at: string | null
          mistake_count: number | null
          next_review_at: string | null
          user_id: string | null
          vocabulary_id: string | null
        }
        Insert: {
          correct_count?: number | null
          id?: string
          last_practiced_at?: string | null
          mistake_count?: number | null
          next_review_at?: string | null
          user_id?: string | null
          vocabulary_id?: string | null
        }
        Update: {
          correct_count?: number | null
          id?: string
          last_practiced_at?: string | null
          mistake_count?: number | null
          next_review_at?: string | null
          user_id?: string | null
          vocabulary_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "word_progress_vocabulary_id_fkey"
            columns: ["vocabulary_id"]
            isOneToOne: false
            referencedRelation: "vocabulary"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_group_ids: { Args: never; Returns: string[] }
      record_word_practice: {
        Args: { p_is_correct: boolean; p_vocab_id: string }
        Returns: undefined
      }
      update_user_xp: { Args: { p_xp_amount: number }; Returns: undefined }
    }
    Enums: {
      article_type: "der" | "die" | "das"
      mastery_level: "new" | "learning" | "review" | "mastered"
      word_type: "noun" | "verb" | "adjective" | "phrase" | "number" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      article_type: ["der", "die", "das"],
      mastery_level: ["new", "learning", "review", "mastered"],
      word_type: ["noun", "verb", "adjective", "phrase", "number", "other"],
    },
  },
} as const
