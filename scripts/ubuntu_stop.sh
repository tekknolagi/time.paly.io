cd $TIME_HOME_DIR$TIME_WORKING_DIR
cat tmp/pids/unicorn.pid | xargs kill -QUIT
rm tmp/pids/unicorn.pid
rm tmp/sockets/unicorn.sock
cd -
