import React from 'react'
import { Button, Modal } from 'rsuite'

interface Props {
  open: boolean,
  onNo: () => void,
  onYes: () => any,
  sadrzaj: string,
}

export default function Prompt(props: Props) {
  return (
    <Modal
      open={props.open}
      onClose={props.onNo}
    >
      <Modal.Title>Da li ste sigurni</Modal.Title>
      <Modal.Body>
        {props.sadrzaj}
      </Modal.Body>
      <Modal.Footer>
        <Button appearance='primary' onClick={props.onYes}>Da</Button>
        <Button appearance='default' onClick={props.onNo}>Ne</Button>
      </Modal.Footer>
    </Modal>
  )
}
