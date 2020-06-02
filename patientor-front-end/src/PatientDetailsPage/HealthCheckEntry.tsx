import React from 'react';
import { List, Icon, Segment } from "semantic-ui-react";
import { HealthCheckEntryTypes } from '../types';

interface DetailsProps {
  onDelete: (id: string) => void;
  entry: HealthCheckEntryTypes;
}

const HealthCheckEntry: React.FC<DetailsProps> = ({ entry, onDelete }) => {
  const color = 
    entry.healthCheckRating === 0 
    ? "green"
    : entry.healthCheckRating === 1
    ? "yellow"
    :  entry.healthCheckRating === 2
    ? "orange"
    : "red";
  return (
    <Segment>
      <List verticalAlign='middle'>
        <List.Item>
          <List.Content>
            <List.Header>
              {entry.date} <Icon name="user doctor" size="large" />
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
        <List.Item>
          <Icon name="heart" size="small" color={color} />
        </List.Item>
      </List>
    </Segment>
  );
};

export default HealthCheckEntry;