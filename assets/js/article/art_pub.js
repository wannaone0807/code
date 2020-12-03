$(function(){
     var layer = layui.layer
     var form = layui.form
    initCate()
    initEditor()
    function initCate(){
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('初始化文章分类失败！')
              }
              var htmlstr = template('tpl-cate',res)
              $('[name=cate_id]').html(htmlstr)
              form.render()
            }
          })
    }
    var $image = $('#image')
     // 1.2 配置选项
      const options = {
           // 纵横比
            aspectRatio: 1, 
            // 指定预览区域
             preview: '.img-preview' 
            }
             // 1.3 创建裁剪区域
             $image.cropper(options)

    $('#btnChooseImage').on('click',function(){
        $('#coverFile').click()
    })

    $('#coverFile').on('change',function(e){
        var filelist = e.target.files
        if(filelist.length == 0){
            return layer.msg('请选择照片！')
        }
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
         .cropper('destroy') 
        // 销毁旧的裁剪区域 
        .attr('src', newImgURL) 
        // 重新设置图片路径 
        .cropper(options)
    })
      
    var art_state = '已发布'
    $('#btnSave2').on('click',function(){
        art_state = '草稿'
    })

    $('#form-pub').on('submit',function(e){
         e.preventDefault()
         var fd = new FormData($(this)[0])
         fd.append('state',art_state)
         $image
         .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
             width: 400,
             height: 280
            })
            .toBlob(function(blob) {
              // 将 Canvas 画布上的内容，转化为文件对象
              // 得到文件对象后，进行后续的操作
               // 5. 将文件对象，存储到 fd 中
             fd.append('cover_img', blob)
              // 6. 发起 ajax 数据请求
            publishArticle(fd)
          })
        })
         
          function publishArticle(fd){
              $.ajax({
                  method:'POST',
                  url:'/my/article/add',
                  data:fd,
                  contentType:false,
                  processData:false,
                  success:function(res){
                    if(res.status !== 0) {
                        return layer.msg('发布文章失败！')
                      }
                      layer.msg('发布文章成功！')
                      location.href = '/article/art_list.html'
                  }
              })
          }

})