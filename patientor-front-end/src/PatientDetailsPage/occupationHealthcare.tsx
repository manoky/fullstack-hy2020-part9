import React from 'react';
import { List, Icon, Segment } from "semantic-ui-react";
import { OccupationalHealthCareEntryTypes } from '../types';

interface DetailsProps {
  onDelete: (id: string) => void;
  entry: OccupationalHealthCareEntryTypes;
}

const OccupationalHealthcareEntry:
  React.FC<DetailsProps> = ({ entry, onDelete }) => {
  return (
    <Segment>
      <List verticalAlign='middle'>
        <List.Item>
          <List.Content>
            <List.Header>
              {entry.date} <Icon name="stethoscope" size="large" />
              {entry.employerName}
            </List.Header>
            {entry.description}
          </List.Content>
          <List.Content floated="right">
            <Icon
              name="trash alternate"
              size="large"
              style={{cursor: 'pointer'}}
              onClick={() => onDelete(entry.id)}
            />
          </List.Content>
        </List.Item>
      </List>
    </Segment>
  );
};

export default OccupationalHealthcareEntry;