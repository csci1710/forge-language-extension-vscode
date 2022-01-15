#lang racket

(define good-str "sig Person{}")
(define bad-str "hello world")

(define-values (c-in c-out) (tcp-connect "localhost" 8879))
(write-bytes (integer->integer-bytes (string-length good-str) 4 #f) c-out)
(write-string good-str c-out)
(close-output-port c-out)
(read-string (string-length good-str) c-in)
