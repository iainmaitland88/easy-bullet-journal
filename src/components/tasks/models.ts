export type TaskJSON = {
  id: string;
  description: string;
  completed: boolean;
};

export class Task {
  readonly id: string;
  description: string;
  completed: boolean;

  constructor(description: string, completed = false, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.description = description;
    this.completed = completed;
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
