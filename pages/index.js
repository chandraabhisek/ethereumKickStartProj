import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
  // this method is react specific and will not be called while Next.js does server side rendering,
  //  so we wont be able to use this to get campaigns list while server side rendering.
  async componentDidMount() {
    // const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
    // console.log(deployedCampaigns);
  }
  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.displayCampaigns()}
        </div>
      </Layout>
    );
  }

  // Nextjs specific so will load while server rendering
  static async getInitialProps() {
    const deployedCampaigns = await factory.methods
      .getDeployedCampaigns()
      .call();
    return { deployedCampaigns: deployedCampaigns };
  }

  displayCampaigns() {
    const items = this.props.deployedCampaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }
}

export default CampaignIndex;
