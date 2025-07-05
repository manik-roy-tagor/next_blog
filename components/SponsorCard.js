import { Card } from "react-bootstrap";

export default function SponsorCard() {
  return (
    <>
      <Card className="shadow-sm border-0 mb-4 bg-white">
        <Card.Header className="bg-warning text-dark fw-bold">🔔 Sponsored</Card.Header>
        <Card.Body className="text-center text-muted">
          <p>Promote your brand here!</p>
        </Card.Body>
      </Card>
    </>
  );
}