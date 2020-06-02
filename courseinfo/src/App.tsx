import React from "react";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface PartOneThreeBase extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends PartOneThreeBase {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends PartOneThreeBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends PartOneThreeBase {
  name: "Defining object types";
  exerciseLevel: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Defining object types",
      exerciseCount: 3,
      description: "couldn't be more interesting",
      exerciseLevel: "Final level"
    }
  ];

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  const renderParts = () => {
    return courseParts.map(part => {
      switch(part.name) {
        case 'Fundamentals':
          return <Content courseParts={part} />;
        case 'Using props to pass data':
          return <Content courseParts={part} />;
        case 'Deeper type usage':
          return <Content courseParts={part} />;
        case 'Defining object types':
          return <Content courseParts={part} />;
        default:
          return assertNever(part);
      }
    })
  }
  return (
    <div>
      <Header name={courseName} />
      {renderParts()}
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;