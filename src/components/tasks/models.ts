export type TaskJSON = {
  id: string;
  description: string;
  completed: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export class Task {
  readonly id: string;
  readonly description: string;
  readonly completed: boolean;
  readonly date: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(
    id: string,
    description: string,
    completed: boolean,
    date: Date,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.description = description;
    this.completed = completed;
    this.date = date;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(description: string, date: Date, completed = false): Task {
    const createdAt = new Date();
    const updatedAt = createdAt;
    return new Task(
      crypto.randomUUID(),
      description,
      completed,
      date,
      createdAt,
      updatedAt,
    );
  }

  toggleCompleted(): Task {
    return new Task(
      this.id,
      this.description,
      !this.completed,
      this.date,
      this.createdAt,
      new Date(),
    );
  }

  toJSON(): TaskJSON {
    return {
      id: this.id,
      description: this.description,
      completed: this.completed,
      date: this.date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(data: TaskJSON): Task {
    return new Task(
      data.id,
      data.description,
      data.completed,
      data.date,
      data.createdAt,
      data.updatedAt,
    );
  }
}
