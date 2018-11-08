pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum,string desc) public {
        address newCampaign = new Campaign(minimum, msg.sender,desc);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    string public campaignDesc;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum,address creator,string desc) public {
        manager = creator;
        minimumContribution =  minimum;
        campaignDesc = desc;
    }

    function contribute() public payable{
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }


    function createRequest(string description, uint value, address recipient) public restricted
    {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {

        Request storage req = requests[index];

        require(approvers[msg.sender]);
        require(!req.approvals[msg.sender]);

        req.approvals[msg.sender] = true;
        req.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {

        Request storage req = requests[index];

        require(req.approvalCount > (approversCount/2)); // MOre than 50% votes yes
        require(!req.complete);

        req.recipient.transfer(req.value);
        req.complete = true;

    }

    function getSummary() public view returns (
      uint, uint, uint, uint, string,address
      ) {
        return (
          minimumContribution,
          this.balance,
          requests.length,
          approversCount,
          campaignDesc,
          manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
