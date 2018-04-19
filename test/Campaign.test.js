require('events').EventEmitter.defaultMaxListeners = 100;
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });
  factory.setProvider(provider);

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000',
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress,
  );
});

describe('Campaigns', () => {
  it('deployes a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the manager of the campaign', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('allows people to contribute money and makrs them as approvers', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200',
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it('requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '5',
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it('allows a manager to make a payment request', async () => {
    await campaign.methods
      .createRequest('Request description', '100', accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000',
      });

    const request = await campaign.methods.requests(0).call();
    assert.equal('Request description', request.description);
  });

  // end to end
  it('processes requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether'),
    });

    await campaign.methods
      .createRequest('Description', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000',
      });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000',
    });

    await campaign.methods.finilizeRequest(0).send({
      from: accounts[0],
      gas: '1000000',
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = parseFloat(web3.utils.fromWei(balance, 'ether'));

    assert(balance > 104);
  });
});
