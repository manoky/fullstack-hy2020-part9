import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { NewEntry } from '../types';
import AddEntryForm from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const AddEntry = ({ modalOpen, onClose, onSubmit, error}: Props) => (
  <Modal open={modalOpen} onClose={onClose} closeIcon centered={false}>
    <Modal.Header>Add new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntry;