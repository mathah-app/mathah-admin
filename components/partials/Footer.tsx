import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
  return (

<footer className="footer">
  <div className="d-sm-flex justify-content-center justify-content-sm-between">
    <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © Mathah Transport 2025</span>
    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted"> Visit <a href="https://www.mathah.app" target="_blank">Our Site</a></span>
  </div>
</footer>
  );
}
