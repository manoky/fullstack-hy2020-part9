import React from 'react';

interface PartProps {
  part: {
    name: string;
    exerciseCount: number;
    description?: string;
    exerciseSubmissionLink?: string;
    exerciseLevel?: string;
  };
}

const Part: React.FC<PartProps> = ({ part }) => {
  return (
    <>
      <div>
          <div>
            <p>{part.name} {part.exerciseCount}</p>
            {part.description && <p>{part.description}</p>}
            {part.exerciseSubmissionLink && (
              <p>
                <a href={part.exerciseSubmissionLink}>
                  {part.exerciseSubmissionLink}
                </a>
              </p>
            )}
            {part.exerciseLevel && <p>{part.exerciseLevel}</p>}
            <hr />
          </div>
      </div>
    </>
  )
}

export default Part;