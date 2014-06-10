cat $TIME_HOME_DIR$TIME_WORKING_DIR'tmp/pids/unicorn.pid' | xargs kill -QUIT
unicorn -c $TIME_HOME_DIR$TIME_WORKING_DIR'unicorn.rb' -E development -D
