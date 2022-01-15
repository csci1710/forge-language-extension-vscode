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

(define server (tcp-listen 8879))

(define (start-accept) 
  (define-values (s-in s-out) (tcp-accept server)) 
  (process-content s-in s-out))

(define (process-content s-in s-out) 
  (with-handlers ([exn:fail? 
                   (lambda (v) (displayln (exn-message v) (current-error-port)) (display (exn-message v) s-out) (close-output-port s-out))] 
	              [exn:break:terminate? 
				   (lambda (v) (tcp-close server) (exit))]) 
	; todo: maybe concat the string here to be safe?
	(my-check-syntax (read-string 10000 s-in)))
  (start-accept))

(start-accept)
