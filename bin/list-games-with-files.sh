aws s3 ls s3://audio-bits-data/games/ --recursive --human-readable \
 | grep '\.mp3' \
 | awk '{ split($5, a, "/"); print $1 " - https://tonalrecall.us/app/#/" a[2] }' \
 | sort \
 | uniq -c -f1