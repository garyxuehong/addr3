import { AddrAng3Page } from './app.po';

describe('addr-ang3 App', function() {
  let page: AddrAng3Page;

  beforeEach(() => {
    page = new AddrAng3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
