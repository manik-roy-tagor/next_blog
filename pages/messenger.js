import { useEffect, useState } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';

const API_URL = 'https://developertagor.xyz/iyf_lal_api/api/';
const currentUserId = 1; // 🔐 বাস্তবে এখানে লগইন ইউজারের ID বসবে

export default function Messenger() {
  const [users, setUsers] = useState([]);
  const [recipientId, setRecipientId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // ✅ ইউজার লোড
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}getAllUsers.php`);
      if (res.data.status === 'success') {
        const filtered = res.data.data.filter(u => parseInt(u.id) !== parseInt(currentUserId));
        setUsers(filtered);
      }
    } catch (err) {
      console.error('Error loading users', err);
    }
  };

  // ✅ মেসেজ লোড
  const fetchMessages = async (to) => {
    try {
      const res = await axios.get(`${API_URL}getMessages.php?from=${currentUserId}&to=${to}`);
      if (res.data.status === 'success') {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error('Error loading messages', err);
    }
  };

  // ✅ মেসেজ পাঠানো
  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      await axios.post(`${API_URL}sendMessage.php`, {
        from: currentUserId,
        to: recipientId,
        message: message.trim(),
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  // ✅ Pusher এবং ইউজার লোড
  useEffect(() => {
    fetchUsers();

    const pusher = new Pusher('f5f69b2eebbce4ee8433', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('chat-channel');
    channel.bind('new-message', function (data) {
      if (
        (parseInt(data.from) === parseInt(currentUserId) && parseInt(data.to) === parseInt(recipientId)) ||
        (parseInt(data.to) === parseInt(currentUserId) && parseInt(data.from) === parseInt(recipientId))
      ) {
        setMessages(prev => [...prev, data]);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [recipientId]);

  return (
    <Container style={{ marginTop: '0px', maxWidth: '960px' }}>
      <Row>
       { /* ✅ ইউজার লিস্ট */}
        <Col md={4} className="border-end mb-4 mb-md-0">
            <h5 className="mb-3 d-none d-md-block text-center">All Users</h5>

            <div className="d-md-none d-flex overflow-auto pb-2 justify-content-center">
                {users.map(user => (
                    <div
                        key={user.id}
                        onClick={() => {
                            setRecipientId(user.id);
                            fetchMessages(user.id);
                        }}
                        style={{
                            minWidth: 50,
                            width: '18vw',
                            maxWidth: 70,
                            marginRight: 10,
                            textAlign: 'center',
                            cursor: 'pointer',
                        }}
                        className={user.id === recipientId ? 'border border-primary rounded-3 p-2 bg-light' : 'p-2'}
                    >
                        <div
                            className="bg-primary text-white rounded-circle mx-auto mb-1"
                            style={{ width: 50, height: 50, lineHeight: '50px', fontSize: 18 }}
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <small>{user.name}</small>
                    </div>
                ))}
            </div>

            {/* ডেক্সটপ: Vertical List */}
          <ListGroup className="d-none d-md-block">
            {users.map(user => (
              <ListGroup.Item
                key={user.id}
                onClick={() => {
                  setRecipientId(user.id);
                  fetchMessages(user.id);
                }}
                active={user.id === recipientId}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center">
                  <div
                    className="bg-primary text-white rounded-circle text-center me-2"
                    style={{ width: 35, height: 35, lineHeight: '35px' }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* ✅ চ্যাট বক্স */}
        <Col md={8}>
          {recipientId ? (
            <>
              <h5 className="mb-3">Chat</h5>

              <div
                style={{
                  maxHeight: '400px',
                  overflowY: 'auto',
                  background: '#f8f9fa',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                {messages.map((msg, i) => {
                  const isSender = parseInt(msg.sender_id) === parseInt(currentUserId);
                  return (
                    <div
                      key={i}
                      className={`d-flex mb-2 ${isSender ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                      <div
                        className={`p-2 rounded-pill ${isSender ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                        style={{
                          maxWidth: '70%',
                          wordWrap: 'break-word',
                          padding: '10px 15px',
                        }}
                      >
                        {msg.message}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="mt-3"
              >
                <Form.Group className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button type="submit" variant="primary" className="ms-2">
                    Send
                  </Button>
                </Form.Group>
              </Form>
            </>
          ) : (
            <p className="text-muted">Select a user to start chatting</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
