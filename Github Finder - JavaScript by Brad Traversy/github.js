class Github {
  constructor () {
    this.cliend_id = 'Iv1.e87509c0685bbe77';
    this.client_secret = 'b75d84e95ab247a64267ddedcc44f5779a00f162';
    this.repos_count = 5;
    this.repos_sort = 'create: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos
    }
  }
}