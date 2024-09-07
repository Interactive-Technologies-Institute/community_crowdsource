export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      branding: {
        Row: {
          color_theme: string
          id: number
          inserted_at: string
          name: string
          radius: number
          slogan: string
          updated_at: string
        }
        Insert: {
          color_theme: string
          id?: number
          inserted_at?: string
          name: string
          radius: number
          slogan: string
          updated_at?: string
        }
        Update: {
          color_theme?: string
          id?: number
          inserted_at?: string
          name?: string
          radius?: number
          slogan?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          date: string
          description: string
          fts: unknown | null
          id: number
          image: string
          inserted_at: string
          location: string
          tags: string[]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          date: string
          description: string
          fts?: unknown | null
          id?: number
          image: string
          inserted_at?: string
          location: string
          tags: string[]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          date?: string
          description?: string
          fts?: unknown | null
          id?: number
          image?: string
          inserted_at?: string
          location?: string
          tags?: string[]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      events_interested: {
        Row: {
          event_id: number
          id: number
          inserted_at: string
          user_id: string
        }
        Insert: {
          event_id: number
          id?: number
          inserted_at?: string
          user_id: string
        }
        Update: {
          event_id?: number
          id?: number
          inserted_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_interested_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_interested_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_interested_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_interested_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      events_moderation: {
        Row: {
          comment: string
          event_id: number
          id: number
          inserted_at: string
          status: Database["public"]["Enums"]["moderation_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          comment: string
          event_id: number
          id?: number
          inserted_at?: string
          status: Database["public"]["Enums"]["moderation_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string
          event_id?: number
          id?: number
          inserted_at?: string
          status?: Database["public"]["Enums"]["moderation_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_moderation_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: true
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_moderation_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: true
            referencedRelation: "events_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_moderation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_moderation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_flags: {
        Row: {
          enabled: boolean
          id: Database["public"]["Enums"]["feature"]
        }
        Insert: {
          enabled?: boolean
          id: Database["public"]["Enums"]["feature"]
        }
        Update: {
          enabled?: boolean
          id?: Database["public"]["Enums"]["feature"]
        }
        Relationships: []
      }
      howtos: {
        Row: {
          description: string
          difficulty: Database["public"]["Enums"]["how_to_difficulty"]
          duration: Database["public"]["Enums"]["how_to_duration"]
          fts: unknown | null
          id: number
          image: string
          inserted_at: string
          steps: Json[]
          tags: string[]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          description: string
          difficulty: Database["public"]["Enums"]["how_to_difficulty"]
          duration: Database["public"]["Enums"]["how_to_duration"]
          fts?: unknown | null
          id?: number
          image: string
          inserted_at?: string
          steps: Json[]
          tags: string[]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          description?: string
          difficulty?: Database["public"]["Enums"]["how_to_difficulty"]
          duration?: Database["public"]["Enums"]["how_to_duration"]
          fts?: unknown | null
          id?: number
          image?: string
          inserted_at?: string
          steps?: Json[]
          tags?: string[]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "howtos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "howtos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      howtos_moderation: {
        Row: {
          comment: string
          howto_id: number
          id: number
          inserted_at: string
          status: Database["public"]["Enums"]["moderation_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          comment: string
          howto_id: number
          id?: number
          inserted_at?: string
          status: Database["public"]["Enums"]["moderation_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string
          howto_id?: number
          id?: number
          inserted_at?: string
          status?: Database["public"]["Enums"]["moderation_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "howtos_moderation_howto_id_fkey"
            columns: ["howto_id"]
            isOneToOne: true
            referencedRelation: "howtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "howtos_moderation_howto_id_fkey"
            columns: ["howto_id"]
            isOneToOne: true
            referencedRelation: "howtos_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "howtos_moderation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "howtos_moderation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      howtos_useful: {
        Row: {
          howto_id: number
          id: number
          inserted_at: string
          user_id: string
        }
        Insert: {
          howto_id: number
          id?: number
          inserted_at?: string
          user_id: string
        }
        Update: {
          howto_id?: number
          id?: number
          inserted_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "howtos_useful_howto_id_fkey"
            columns: ["howto_id"]
            isOneToOne: false
            referencedRelation: "howtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "howtos_useful_howto_id_fkey"
            columns: ["howto_id"]
            isOneToOne: false
            referencedRelation: "howtos_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "howtos_useful_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "howtos_useful_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      map_pins: {
        Row: {
          id: number
          inserted_at: string
          lat: number
          lng: number
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          lat: number
          lng: number
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: number
          inserted_at?: string
          lat?: number
          lng?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "map_pins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "map_pins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      map_pins_moderation: {
        Row: {
          comment: string
          id: number
          inserted_at: string
          map_pin_id: number
          status: Database["public"]["Enums"]["moderation_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          comment: string
          id?: number
          inserted_at?: string
          map_pin_id: number
          status: Database["public"]["Enums"]["moderation_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string
          id?: number
          inserted_at?: string
          map_pin_id?: number
          status?: Database["public"]["Enums"]["moderation_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "map_pins_moderation_map_pin_id_fkey"
            columns: ["map_pin_id"]
            isOneToOne: true
            referencedRelation: "map_pins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "map_pins_moderation_map_pin_id_fkey"
            columns: ["map_pin_id"]
            isOneToOne: true
            referencedRelation: "map_pins_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "map_pins_moderation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "map_pins_moderation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      parameters: {
        Row: {
          children: string[] | null
          code: string
          id: number
          image: string | null
          is_parent: boolean
          name: string | null
          parent: string | null
          type: string
        }
        Insert: {
          children?: string[] | null
          code: string
          id?: number
          image?: string | null
          is_parent: boolean
          name?: string | null
          parent?: string | null
          type: string
        }
        Update: {
          children?: string[] | null
          code?: string
          id?: number
          image?: string | null
          is_parent?: boolean
          name?: string | null
          parent?: string | null
          type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          description: string
          display_name: string
          email: string
          id: string
          inserted_at: string
          type: string
          updated_at: string
        }
        Insert: {
          description?: string
          display_name?: string
          email: string
          id: string
          inserted_at?: string
          type: string
          updated_at?: string
        }
        Update: {
          description?: string
          display_name?: string
          email?: string
          id?: string
          inserted_at?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["user_permission"]
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["user_permission"]
          role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["user_permission"]
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      signs: {
        Row: {
          annotated: boolean
          annotation: string | null
          annotation_array: number[]
          created_at: string
          fts: unknown | null
          id: number
          is_annotated: number
          last_changed: string
          name: string
          selected: boolean
          theme: string[]
          user_id: string
          video: string
          written_annotation: string[] | null
        }
        Insert: {
          annotated: boolean
          annotation?: string | null
          annotation_array: number[]
          created_at?: string
          fts?: unknown | null
          id?: number
          is_annotated: number
          last_changed?: string
          name: string
          selected: boolean
          theme: string[]
          user_id: string
          video: string
          written_annotation?: string[] | null
        }
        Update: {
          annotated?: boolean
          annotation?: string | null
          annotation_array?: number[]
          created_at?: string
          fts?: unknown | null
          id?: number
          is_annotated?: number
          last_changed?: string
          name?: string
          selected?: boolean
          theme?: string[]
          user_id?: string
          video?: string
          written_annotation?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "signs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      signs_interested: {
        Row: {
          id: number
          inserted_at: string
          sign_id: number
          user_id: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          sign_id: number
          user_id: string
        }
        Update: {
          id?: number
          inserted_at?: string
          sign_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "signs_interested_sign_id_fkey"
            columns: ["sign_id"]
            isOneToOne: false
            referencedRelation: "signs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signs_interested_sign_id_fkey"
            columns: ["sign_id"]
            isOneToOne: false
            referencedRelation: "signs_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signs_interested_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signs_interested_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_types: {
        Row: {
          is_default: boolean
          label: string
          slug: string
        }
        Insert: {
          is_default?: boolean
          label: string
          slug: string
        }
        Update: {
          is_default?: boolean
          label?: string
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      events_tags: {
        Row: {
          count: number | null
          tag: string | null
        }
        Relationships: []
      }
      events_view: {
        Row: {
          date: string | null
          description: string | null
          fts: unknown | null
          id: number | null
          image: string | null
          inserted_at: string | null
          location: string | null
          moderation_status:
            | Database["public"]["Enums"]["moderation_status"]
            | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      howtos_tags: {
        Row: {
          count: number | null
          tag: string | null
        }
        Relationships: []
      }
      howtos_view: {
        Row: {
          description: string | null
          difficulty: Database["public"]["Enums"]["how_to_difficulty"] | null
          duration: Database["public"]["Enums"]["how_to_duration"] | null
          fts: unknown | null
          id: number | null
          image: string | null
          inserted_at: string | null
          moderation_status:
            | Database["public"]["Enums"]["moderation_status"]
            | null
          steps: Json[] | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "howtos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "howtos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      map_pins_view: {
        Row: {
          id: number | null
          inserted_at: string | null
          lat: number | null
          lng: number | null
          moderation_status:
            | Database["public"]["Enums"]["moderation_status"]
            | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "map_pins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "map_pins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles_view: {
        Row: {
          description: string | null
          display_name: string | null
          email: string | null
          id: string | null
          inserted_at: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          type: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      signs_tags: {
        Row: {
          count: number | null
          tag: string | null
        }
        Relationships: []
      }
      signs_view: {
        Row: {
          annotated: boolean | null
          annotation: string | null
          annotation_array: number[] | null
          created_at: string | null
          fts: unknown | null
          id: number | null
          is_annotated: number | null
          last_changed: string | null
          name: string | null
          selected: boolean | null
          theme: string[] | null
          user_id: string | null
          video: string | null
          written_annotation: string[] | null
        }
        Insert: {
          annotated?: boolean | null
          annotation?: string | null
          annotation_array?: number[] | null
          created_at?: string | null
          fts?: unknown | null
          id?: number | null
          is_annotated?: number | null
          last_changed?: string | null
          name?: string | null
          selected?: boolean | null
          theme?: string[] | null
          user_id?: string | null
          video?: string | null
          written_annotation?: string[] | null
        }
        Update: {
          annotated?: boolean | null
          annotation?: string | null
          annotation_array?: number[] | null
          created_at?: string | null
          fts?: unknown | null
          id?: number | null
          is_annotated?: number | null
          last_changed?: string | null
          name?: string | null
          selected?: boolean | null
          theme?: string[] | null
          user_id?: string | null
          video?: string | null
          written_annotation?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "signs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["user_permission"]
        }
        Returns: boolean
      }
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
      get_event_interest_count: {
        Args: {
          event_id: number
          user_id?: string
        }
        Returns: {
          count: number
          has_interest: boolean
        }[]
      }
      get_howto_useful_count: {
        Args: {
          howto_id: number
          user_id?: string
        }
        Returns: {
          count: number
          has_useful: boolean
        }[]
      }
      get_sign_interest_count: {
        Args: {
          sign_id: number
          user_id?: string
        }
        Returns: {
          count: number
          has_interest: boolean
        }[]
      }
      update_user_types: {
        Args: {
          types: Database["public"]["CompositeTypes"]["user_type"][]
        }
        Returns: undefined
      }
    }
    Enums: {
      feature: "dictionary" | "howtos" | "events" | "map" | "academy"
      how_to_difficulty: "easy" | "medium" | "hard"
      how_to_duration: "short" | "medium" | "long"
      moderation_status:
        | "pending"
        | "changes_requested"
        | "approved"
        | "rejected"
      user_permission:
        | "users.moderate"
        | "howtos.create"
        | "howtos.update"
        | "howtos.delete"
        | "howtos.moderate"
        | "events.create"
        | "events.update"
        | "events.delete"
        | "events.moderate"
        | "map.create"
        | "map.update"
        | "map.delete"
        | "map.moderate"
        | "features.update"
        | "branding.update"
        | "user_types.update"
        | "signs.create"
        | "signs.update"
        | "signs.delete"
      user_role: "user" | "moderator" | "admin"
    }
    CompositeTypes: {
      user_type: {
        slug: string | null
        label: string | null
        is_default: boolean | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

