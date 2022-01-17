#lang racket

(define good-str "#lang forge

sig A {}
sig B {}

sig Node1 {
    edges11, edges12: set A -> B, 
    edges21, edges22: set B -> A 
}

myRun : run {} ")

(define bad-str (make-string 10000 #\z))

(define (talk-to-server some-str c-in c-out i)
  (write-bytes (integer->integer-bytes (string-length some-str) 4 #f) c-out)
  (write-string some-str c-out)
  (close-output-port c-out)
  (display i)
  (displayln " Bye!"))
  ; (read-string (string-length some-str) c-in))

(define (multiple-clients some-str n) 
  (for ([i (in-range 0 n)])
    (define-values (c-in c-out) (tcp-connect "localhost" 8879))
	(thread
		(lambda () 
		  (display i)
          (displayln " entered ...")
		  (sleep (random 3))
		  (talk-to-server some-str c-in c-out i)))))

(multiple-clients good-str 50)
(multiple-clients bad-str 50)