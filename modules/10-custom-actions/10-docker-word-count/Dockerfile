FROM alpine:3.21

# UID 1001 matches the GitHub-hosted runner user, so the entrypoint can append to GITHUB_OUTPUT.
RUN adduser -D -u 1001 action
COPY entrypoint.sh /entrypoint.sh
RUN chmod 755 /entrypoint.sh

USER action
ENTRYPOINT ["/entrypoint.sh"]
