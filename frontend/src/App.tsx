import { useState, useEffect } from 'react'
import { createItem, getAllItems, updateItem, deleteItem } from './api/itemService'
import { Button, Form, Input, Table, Select, notification } from 'antd'
import 'antd/dist/reset.css'
import './App.css'
import { handleAction } from './util/actionHandler'


const { Option } = Select

function App() {
  const [action, setAction] = useState<"create" | "view" | "edit" | "delete" | null>(null)
  const [items, setItems] = useState<any[]>([])
  const [formData, setFormData] = useState({ id: 0, name: "", description: "", price: 0 })

  useEffect(() => {
    if (action === "view" || action === "edit" || action === "delete") fetchItems()
  }, [action])

  const fetchItems = async () => {
    try {
      const data = await getAllItems()
      setItems(data)
    } catch (error) {
      console.error("Error fetching items:", error)
    }
  }

  const handleCreate = () => {
    handleAction(
      "Create Item",
      createItem,
      [{ name: formData.name, description: formData.description, price: formData.price }],
      () => setAction(null)
    );
  };
  
  const handleEdit = () => {
    handleAction(
      "Edit Item",
      updateItem,
      [formData.id, { name: formData.name, description: formData.description, price: formData.price }],
      () => setAction(null)
    );
  };
  
  const handleDelete = () => {
    handleAction(
      "Delete Item",
      deleteItem,
      [formData.id],
      () => setAction(null)
    );
  };

  const handleIdChange = (value: string) => {
    const selectedId = +value
    const selectedItem = items.find((item) => item.id === selectedId)
    setFormData({
      id: selectedId,
      name: selectedItem?.name || "",
      description: selectedItem?.description || "",
      price: selectedItem?.price || 0,
    })
  }

  return (
    <div className="app">
      <h1>Item Management</h1>
      <div className="button-group">
        <Button onClick={() => setAction("create")} type="default">Create Item</Button>
        <Button onClick={() => setAction("view")} type="default">View All Item</Button>
        <Button onClick={() => setAction("edit")} type="default">Edit Item</Button>
        <Button onClick={() => setAction("delete")} type="default">Delete Item</Button>
      </div>

      <div className="action-container">
        {action === "create" && (
          <div className="form-container">
            <h2>Create Item</h2>
            <Form onFinish={handleCreate} initialValues={formData}>
              <Form.Item label="Name" name="name" rules={[{ required: true}]}>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </Form.Item>
              <Form.Item label="Description" name="description" >
                <Input.TextArea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </Form.Item>
              <Form.Item label="Price" name="price" rules={[{ required: true}]}>
                <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: +e.target.value })} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </div>
        )}

        {action === "view" && (
          <div>
            <h2>All Items</h2>
            <Table
              dataSource={items}
              columns={[
                { title: "ID", dataIndex: "id", key: "id" },
                { title: "Name", dataIndex: "name", key: "name" },
                { title: "Description", dataIndex: "description", key: "description" },
                { title: "Price", dataIndex: "price", key: "price" },
              ]}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              onChange={(pagination, filters, sorter) => {
                console.log("Params:", pagination, filters, sorter);
              }}
            />
          </div>
        )}

        {action === "edit" && (
          <div className="form-container">
            <h2>Edit Item</h2>
            <Form
              onFinish={handleEdit}
              key={formData.id}
              initialValues={formData}
            >
              <Form.Item label="Select Item" name="id" rules={[{ required: true }]}>
                <Select value={formData.id.toString()} onChange={handleIdChange}>
                  <Option value="">-- Select an ID --</Option>
                  {items.map((item) => (
                    <Option key={item.id} value={item.id.toString()}>
                      {item.id} - {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Name" name="name">
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input.TextArea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </Form.Item>
              <Form.Item label="Price" name="price">
                <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: +e.target.value })} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form>
          </div>
        )}

        {action === "delete" && (
          <div className="form-container">
            <h2>Delete Item</h2>
            <Form onFinish={handleDelete}>
              <Form.Item label="Select Item" name="id" rules={[{ required: true }]}>
                <Select value={formData.id.toString()} onChange={handleIdChange}>
                  <Option value="">-- Select an ID --</Option>
                  {items.map((item) => (
                    <Option key={item.id} value={item.id.toString()}>
                      {item.id} - {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Delete
              </Button>
            </Form>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
