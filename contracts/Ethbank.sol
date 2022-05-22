// SPDX-License-Identifier: MIT

pragma solidity ^0.5.13;

import "./ERT.sol";
import "./Tether.sol";

contract Ethbank {
    string public name = "Ethbank";
    address public owner;
    Tether public tether;
    ERT public ert;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(ERT _ert, Tether _tether) public {
        tether = _tether;
        ert = _ert;
        owner = msg.sender;
    }

    // Statking function
    function depositTokens(uint256 _amount) public {
        require(_amount > 0, "Amount cannot be 0");

        // Transfer tether token to contract account address
        tether.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Rewards function
    function issueRewards() public {
        require(msg.sender == owner, "Caller must be owner");

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 9;
            if (balance > 0) {
                ert.transfer(recipient, balance);
            }
        }
    }

    // Unstake function
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "balance must be greater than 0");

        tether.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
        hasStaked[msg.sender] = false;
    }
}
