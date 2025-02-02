export type TaskJSON = {
  id: string;
  description: string;
  completed: boolean;
};

export class Task {
  readonly id: string;
  description: string;
  completed: boolean;

  private constructor(description: string, completed = false, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.description = description;
    this.completed = completed;
  }

  static create(description: string, completed = false, id?: string): Task {
    return new Task(description, completed, id);
  }

  toggleCompleted(): Task {
    return new Task(this.description, !this.completed, this.id);
  }

  toJSON(): TaskJSON {
    return {
      id: this.id,
      description: this.description,
      completed: this.completed,
    };
  }

  static fromJSON(data: TaskJSON): Task {
    return new Task(data.description, data.completed, data.id);
  }
}
