$(function(){
    initartcatelist()
    function initartcatelist(){
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success:function(res){
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    
    var indexadd = null
    $('#btnAddCate').on('click',function(){
        indexadd =  layui.layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('新增分类失败！')
                }
                initartcatelist()
                layui.layer.msg('新增分类成功！')
                layui.layer.close(indexadd)
            }
        })
    })

    var indexedit = null
    $('tbody').on('click','.btn-edit',function(){
        indexedit =  layui.layer.open({
                 type:1,
                 area:['500px','250px'],
                 title: '修改文章分类',
                 content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            method:'GET',
            url:'/my/article/cates/'+id,
            success:function(res){
                layui.form.val('form-edit',res.data)
            }
        })
    })

    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('更新分类失败！')
                }
                initartcatelist()
                layui.layer.msg('更新分类成功！')
                layui.layer.close(indexedit)
            }
        })
    })

    $('tbody').on('click','.btn-delete',function(){
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/' + id,
                success:function(res){
                    if(res.status !== 0){
                        return layui.layer.msg('删除分类失败！')
                    }
                    initartcatelist()
                    layui.layer.msg('删除分类成功！')
                    layui.layer.close(index)
                  }
               })
             })
         })   
})