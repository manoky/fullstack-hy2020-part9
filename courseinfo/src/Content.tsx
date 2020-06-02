import React from 'react';
import Part from './Part';


interface ContentProps {
  courseParts: {
    name: string;
    exerciseCount: number;
    description?: string;
    exerciseSubmissionLink?: string;
    exerciseLevel?: string;
  };
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <Part part={courseParts} />
  );
}

export default Content;