package com.org.api.util;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

public class ResponseDomain {


    private HttpStatus status;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timestamp;

    private String message;

    public ResponseDomain() {
    }

    public ResponseDomain(HttpStatus status) {
        this.status = status;
    }

    public ResponseDomain(HttpStatus status, LocalDateTime timestamp) {
        this.status = status;
        this.timestamp = timestamp;
    }

    public ResponseDomain(HttpStatus status, LocalDateTime timestamp, String message) {
        this.status = status;
        this.timestamp = timestamp;
        this.message = message;
    }

    public static ResponseEntity badRequest(String message) {
        return new ResponseEntity<>(new ResponseDomain(HttpStatus.BAD_REQUEST, LocalDateTime.now(), message),
                HttpStatus.BAD_REQUEST);
    }

    public static ResponseEntity badRequest() {
        return new ResponseEntity<>(new ResponseDomain(HttpStatus.BAD_REQUEST, LocalDateTime.now()), HttpStatus
                .BAD_REQUEST);
    }

    public static ResponseEntity<?> responseNotFound() {
        return new ResponseEntity<>(new ResponseDomain(HttpStatus.NOT_FOUND, LocalDateTime.now()), HttpStatus
                .NOT_FOUND);
    }

    public static ResponseEntity<?> responseNotFound(String message) {
        return new ResponseEntity<>(new ResponseDomain(HttpStatus.NOT_FOUND, LocalDateTime.now(), message),
                HttpStatus.NOT_FOUND);
    }

    public static ResponseEntity<?> putResponse() {
        return new ResponseEntity<>(new ResponseDomain(HttpStatus.OK, LocalDateTime.now()), HttpStatus.OK);
    }

    public static ResponseEntity<?> putResponse(String message) {
        return new ResponseEntity<>(new ResponseDomain(HttpStatus.OK, LocalDateTime.now(), message), HttpStatus.OK);
    }

    public static ResponseEntity<?> successResponse() {
        return new ResponseEntity<>(new ResponseDomain(HttpStatus.OK, LocalDateTime.now()), HttpStatus.OK);
    }

    public static ResponseEntity<?> successResponse(String message) {
        return new ResponseEntity<>(new ResponseDomain(HttpStatus.OK, LocalDateTime.now(), message), HttpStatus.OK);
    }


    public static ResponseEntity<?> postResponse() {
        return new ResponseEntity<>(new ResponseDomain(HttpStatus.CREATED, LocalDateTime.now()), HttpStatus.CREATED);
    }

    public static ResponseEntity<?> postResponse(String message) {
        return new ResponseEntity<>(new ResponseDomain(HttpStatus.CREATED, LocalDateTime.now(), message), HttpStatus
                .CREATED);
    }

    public static ResponseEntity<?> deleteResponse() {
        return new ResponseEntity<>(new ResponseDomain(HttpStatus.OK, LocalDateTime.now()), HttpStatus.OK);
    }

    public static ResponseEntity<?> deleteResponse(String message) {
        return new ResponseEntity<>(new ResponseDomain(HttpStatus.OK, LocalDateTime.now(), message), HttpStatus.OK);
    }

    public static ResponseEntity<?> internalServerError() {
        return new ResponseEntity<>(new ResponseDomain(HttpStatus.INTERNAL_SERVER_ERROR, LocalDateTime.now()),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public static ResponseEntity<?> internalServerError(String message) {
        return new ResponseEntity<>(new ResponseDomain(HttpStatus.INTERNAL_SERVER_ERROR, LocalDateTime.now(),
                message), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
