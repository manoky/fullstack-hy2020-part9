import React from 'react';
import { List, Icon, Segment } from "semantic-ui-react";
import { HospitalEntryTypes } from '../types';

interface DetailsProps {
  onDelete: (id: string) => void;
  entry: HospitalEntryTypes;
}

const HospitalEntry: React.FC<DetailsProps> = ({ entry, onDelete }) => {
  return (
    <Segment>
      <List verticalAlign='middle'>
        <List.Item>
          <List.Content>
            <List.Header>
              {entry.date} <Icon name="stethoscope" size="large" />
              </List.Header>
            {entry.description}
          </List.Content>
          <List.Content floated="right">
            <Icon
              name="trash alternate"
              size="large"
              style={{ cursor: 'pointer' }}
              onClick={() => onDelete(entry.id)}
            />
          </List.Content>
        </List.Item>
      </List>
    </Segment>
  );
};

export default HospitalEntry;