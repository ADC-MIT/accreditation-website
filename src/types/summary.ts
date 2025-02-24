export interface Event {
  id: string;
  classification?: 'TEAM' | 'INDIVIDUAL';
  participant_id?: string;
  position?: number;
  award?: string;
  type?: 'SPORTS' | 'CULTURAL' | 'ACADEMIC' | 'OTHER';
  speaker?: string;
  no_of_students?: number;
  no_of_teachers?: number;
}

export interface Publication {
  id: string;
  year: number;
  semester: 'ODD' | 'EVEN';
  title: string;
}

export interface BookPublication extends Publication {
  isbn: number;
  type: 'BOOK' | 'CHAPTER';
}

export interface JournalPublication extends Publication {
  journal_id: string;
  journal_volume_number: number;
  journal_issue_number: number;
  sponsor_id: string;
  doi: string;
}

export interface SummaryResponse {
  events: {
    competitive: {
      count: number;
      events: Event[];
      position_distribution: Record<string, number>;
    };
    informational: {
      count: number;
      events: Event[];
    };
  };
  publications: {
    book: {
      count: number;
      book: BookPublication[];
    };
    journal: {
      count: number;
      journal: JournalPublication[];
    };
  };
}
