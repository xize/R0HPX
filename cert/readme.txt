in this folder you can generate your own server.key, server.crt and server.csr
this is need to support ssl on your servers.

how todo this?:

(1 create private key with a password phrase: openssl genrsa -des3 -out server.key 2048
(2 remove password phrase from key because webservers are ment to be public: openssl rsa -in server.key -out server.key
(3 create self signing certificate: openssl req -new -key server.key -out server.csr
(4 sign the certificate: openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

note:
keep in mind that this is ment for local networks only, I won't recommend to use this software if you are organisation.
this is because I don't understand certificates that much especially the unsigned ones (which I know is unsafe).

however feel free to make a PR :)