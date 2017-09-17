Ext.define('APP.view.hr.file.album.photoForm', {
    extend: 'Ext.form.Panel',
    xtype: 'hrFileAlbumphotoForm',
    controller: 'hr.file.document',
    width: 800,
    items: [{
        title: '上传图片',
        items: [{
            columnWidth: .2,
            items: [{
                xtype: 'fieldcontainer', margin:'0 5 0 0',
                items: [{
                    xtype: 'uploadimagefield',
                    mateParameters: {
                        title: '上传 图片', name: 'url', 
                        callback: function(a, b) {
                            a.down('filefield').hide();
                            a.down('button').show();
                            function createUploadImgBox(p) {
                                p.add({
                                    columnWidth: .2,
                                    items: [{
                                        xtype: 'fieldcontainer', margin:'0 5 0 0',
                                        items: [{
                                            xtype: 'uploadimagefield',
                                            mateParameters: {
                                                title: '上传 图片', name: 'url', 
                                                callback: function(a, b) {
                        							a.down('filefield').hide();
                                                    a.down('button').show();
                                                    createUploadImgBox(p);
                                                }
                                            }
                                        }]
                                    }]
                                });
                            }
                            createUploadImgBox(a.up('fieldset'));

                            //----
                            // var aaa = localStorage.getItem('xiangce') || '';
                            // aaa = aaa.split(',');

                            // aaa.push(b.src);
                            // localStorage.setItem('xiangce',aaa);
                        }
                    }
                }]
            }]
        }]
    }]
});