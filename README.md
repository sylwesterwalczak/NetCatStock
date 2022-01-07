# NetCatStock
A simple example of a server in Node.js technology that uses the TCP protocol for communication. Netcat as a client.


# Environment

- Three virtual machines (possible Windows WSL implementation) of Ubuntu.
- All machines require the netcat utility.
- Host also requires node.js (implementation written in node@17.3.0)

## Network settings

### Windows WSL
After installing all the required libraries, switch the WSL network mode to the private network.

### VirtualBox
- Install the required libraries.
- Create new NAT network. 
- Select the same network on all machines (Select NAT Network in Network settings on machine)
- 
Private networkn.

## Usage
#### Host startup
```
host@machine:~$ nc server.js
Started listen on [YOUR IP PORT] { address: '::', family: 'IPv6', port: 4000 }
```
#### Connecting the client to the host

```
client@machine:~$ nc [YOUR IP PORT] 4000
```
#### Make SELL order
_command is case-insensitive_

```
client@machine:~$ SELL:[ITEM_NAME]
ACK:[ITEM_NAME]
```
#### Make BUY order
_command is case-insensitive_
```
client@machine:~$ BUY:[ITEM_NAME]
ACK:[ITEM_NAME]
```


The server logs information about logging in and logging out of users, sale and buy orders and transactions. 
