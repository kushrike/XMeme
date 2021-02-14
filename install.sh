sudo apt update -y
sudo apt upgrade -y
sudo apt-get install -y mongodb
sudo systemctl start mongodb.service
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y npm
cd backend; sudo npm install pm2 -g
