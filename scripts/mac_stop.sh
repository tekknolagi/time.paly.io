cat $TIME_HOME_DIR$TIME_WORKING_DIR'tmp/pids/unicorn.pid' | xargs kill -QUIT
nginx -s stop
