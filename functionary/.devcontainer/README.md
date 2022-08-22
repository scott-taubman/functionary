## git ssh keys

In order share your git ssh keys with the devcontainer, you'll need to use
`ssh-agent`. Add the following to your `~/.bash_profile`, or equivalent if you
are using a different shell:

```shell
# ssh-agent
if [ -z "$SSH_AUTH_SOCK" ]; then
   # Check for a currently running instance of the agent
   RUNNING_AGENT="`ps -ax | grep 'ssh-agent -s' | grep -v grep | wc -l | tr -d '[:space:]'`"
   if [ "$RUNNING_AGENT" = "0" ]; then
        # Launch a new instance of the agent
        ssh-agent -s &> $HOME/.ssh/ssh-agent
   fi
   eval `cat $HOME/.ssh/ssh-agent`
fi
```

Restart your terminal or computer to let this code run and get ssh-agent
started. Then add your github key by running:

```shell
ssh-add /path/to/githubkey
```

Now when you launch the devcontainer, your git credentials should be loaded. You
can verify this by opening a terminal inside the container and running:

```shell
ssh-add -l
```

If you see your github credentials listed, then you're good to go.
