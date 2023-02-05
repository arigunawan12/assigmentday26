import React, { useState, useEffect } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const [nameEdit, setNameEdit] = useState("");
  const [descEdit, setDescEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => setShow(id);

  const getData = () => {
    Axios({
      method: "get",
      url: "http://localhost:7777/product",
    }).then(function (response) {
      setData(response.data.data);
    });
  };

  const handleEdit = () => {
    Axios({
      method: "put",
      url: `http://localhost:7777/product/${show}`,
      data: {
        name: nameEdit,
        desc: descEdit,
        image: imageEdit,
        price: priceEdit,
      },
    }).then(function (response) {
      handleClose();
      setNameEdit("");
      setDescEdit("");
      setImageEdit("");
      setPriceEdit(0);
      getData();
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    Axios({
      method: "post",
      url: "http://localhost:7777/product",
      data: {
        name,
        desc,
        image,
        price,
      },
    }).then(function (response) {
      setName("");
      setDesc("");
      setImage("");
      setPrice(0);
      getData();
    });
  };

  const handleDelete = (id) => {
    Axios({
      method: "post",
      url: `http://localhost:7777/product/delete/${id}`,
    }).then(function (response) {
      getData();
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Form onSubmit={handleAdd}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Input Name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Input Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </Form.Group>

        <Form.Label htmlFor="basic-url">Your image URL</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">https://</InputGroup.Text>
          <Form.Control id="basic-url" aria-describedby="basic-addon3" placeholder="Input URL Image" value={image} onChange={(e) => setImage(e.target.value)} />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Rp</InputGroup.Text>
          <Form.Control type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </InputGroup>

        <Button variant="primary" size="sm" onClick={handleAdd}>
          Submit
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.desc}</td>
                <td>{item.image}</td>
                <td>{item.price}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleShow(item.id)} active>
                    Edit
                  </Button>{" "}
                  <Button variant="secondary" size="sm" onClick={() => handleDelete(item.id)} active>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
          {/* with map */}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Input Name" value={nameEdit} onChange={(e) => setNameEdit(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Input Description" value={descEdit} onChange={(e) => setDescEdit(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" placeholder="Input URL Image" value={imageEdit} onChange={(e) => setImageEdit(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Price" value={priceEdit} onChange={(e) => setPriceEdit(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
