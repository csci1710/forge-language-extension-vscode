#lang racket

(require
  (only-in forge/lang/alloy-syntax/parser
    parse)
  (only-in forge/lang/alloy-syntax/tokenizer
    make-tokenizer))

(define (my-check-syntax str)
  (call-with-input-string str
    (lambda (in-port)
      (parse 'my-check-syntax-input (make-tokenizer in-port)))))
      
(define (file-to-string path)  
  (call-with-input-file path 
    (lambda (in) (port->string in))))
    
(define args (current-command-line-arguments))
(define content (file-to-string (vector-ref args 0)))

; use exit code 3 to indicate syntax error to server
(with-handlers ([exn:fail? (lambda (v) (displayln (exn-message v) (current-error-port)) (exit 3))]) (my-check-syntax content))