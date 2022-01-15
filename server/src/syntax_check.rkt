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
                   (lambda (v) 
				     (displayln (exn-message v) (current-error-port)) 
					 (write (exn-message v) s-out))] 
	              [exn:break:terminate? 
				   (lambda (v) (tcp-close server) (exit))]) 

	; the client should first send an 4-byte integer to indicate the string length 
	(display "waiting for bytes\n")
	(define count (integer-bytes->integer (read-bytes 4 s-in) #f #f))
	(displayln count (current-error-port)) 
    (display "got some bytes\n")
	(my-check-syntax (read-string count s-in)))
   (close-output-port s-out)
  (start-accept))

(start-accept)
