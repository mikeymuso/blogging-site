import React from 'react';
import { Container, Table } from 'react-bootstrap';

const CommentsTable = () => {
  return (
    <Container>
      <h2>Comments</h2>
      <Table striped bordered hover variant="dark" responsive="md" size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Author</th>
            <th>Comment</th>
            <th>Posted</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Joe Bloggs</td>
            <td>Lorem ipsum...</td>
            <td>12/03/2020</td>
            <td className="cell-centered">
              <i className="fas fa-trash-alt" />
            </td>
            <td className="cell-centered">
              <i className="far fa-edit" />
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default CommentsTable;
