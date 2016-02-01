describe('[ka-kmc-hoster] ka-kmc-config service',function()
{
    beforeEach(function()
    {
        module('ka-kmc-hoster');

        window.kmc = {
          vars :{
              ks : 'sss'
          }
        };
    });

    it('should read ks from parent kmc hoster',function()
    {
        inject(function(kaKMCConfig)
        {
            expect(kaKMCConfig.ks).toBeDefined();
        });

    });
});
