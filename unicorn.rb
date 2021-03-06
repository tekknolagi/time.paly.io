home = ENV['TIME_HOME_DIR']
working = ENV['TIME_WORKING_DIR']
procs = ENV['TIME_PROCESSES'].to_i

@dir = "#{home}#{working}"

worker_processes procs
working_directory @dir

timeout 30

listen "#{@dir}tmp/sockets/unicorn.sock", :backlog => 64

pid "#{@dir}tmp/pids/unicorn.pid"

stderr_path "#{@dir}tmp/log/unicorn.stderr.log"
stdout_path "#{@dir}tmp/log/unicorn.stdout.log"
