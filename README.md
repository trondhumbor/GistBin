#GistBin
A web service which securely saves codesnippets.

The snippets are encrypted and decrypted in your browser using AES CCM.
Only the ciphertext, IV and salt are sent to the server, and the encryption key
is stored in your URL hash. If the paste was successfully stored on the
server, you will be redirected to a page where you can view your paste.

Storing the encryption key in the URL hash means that the key won't be sent
to the server during decryption.
