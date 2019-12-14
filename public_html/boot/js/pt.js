$(document).ready(function () {

    function addPatient(data) {
        var dataitems = {
            "async": true,
            "crossDomain": true,
            "url": "patients",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "2612534b-9ccd-ab7e-1f73-659029967199"
            },
            "processData": false,
            "data": JSON.stringify(data)
        }

        $.ajax(dataitems).done(function (response) {
            $('.modal').modal('hide')
            $.notify("Patient Added Successfully", { "status": "success" });
            console.log(response);
            table.destroy();
            $('#datatable4 tbody').empty(); // empty in case the columns change
            getPatient()
        });
    }

    function deletePatient(id) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "patient/" + id,
            "method": "DELETE",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "28ea8360-5af0-1d11-e595-485a109760f2"
            }
        }

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this data",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function () {
            $.ajax(settings).done(function (response) {
                if(response.hasOwnProperty("err")){
                    swal({
                        title: "Error",
                        text: response['err'],
                        type: "info",
                        showCancelButton: false,
                        closeOnConfirm: false,
                        inputPlaceholder: "Write something"
                      });
                }
                else
                    swal("Deleted!", "Patient has been deleted.", "success");
                table.destroy();
                $('#datatable4 tbody').empty(); // empty in case the columns change
                getPatient()
            });


        });

    }

    function updatePatient(data, id) {
        var jsondt = {
            "async": true,
            "crossDomain": true,
            "url": "patient/" + id,
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(data)
        }

        $.ajax(jsondt).done(function (response) {
            $('.modal').modal('hide')
            $.notify("Patient Updated Successfully", { "status": "success" });
            table.destroy();
            $('#datatable4 tbody').empty(); // empty in case the columns change
            getPatient();
        });


    }

    function getPatient() {
        var data = {
            "async": true,
            "crossDomain": true,
            "url": "patients",
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(data).done(function (response) {
            table = $('#datatable4').DataTable({
                "bDestroy": true,
                'paging': false, // Table pagination
                'ordering': true, // Column ordering
                'info': true, // Bottom left status text
                aaData: response,
                "aaSorting": [],
                aoColumns: [
                    {
                        mData: 'first_name'
                    },
                    {
                        mData: 'last_name'
                    },
                    {
                        mData: 'insurance_no'
                    },
                    {
                        mData: 'address'
                    },
                    {
                        mData: 'mb_no'
                    },
                    {
                        mData: 'disease'
                    },
                    {
                        mRender: function (o) {
                            return '<button class="btn-xs btn btn-info btn-edit" type="button">Edit</button>';
                        }
                    },
                    {
                        mRender: function (o) {
                            return '<button class="btn-xs btn btn-danger delete-btn" type="button">Delete</button>';
                        }
                    }
                ]
            });

            $('#datatable4 tbody').on('click', '.delete-btn', function () {
                var data = table.row($(this).parents('tr')).data();
                deletePatient(data.id);

            });

            $('.btn-edit').one("click", function (e) {
                var data = table.row($(this).parents('tr')).data();
                $('#myModal').modal().one('shown.bs.modal', function (e) {
                    for (var key in data) {
                        $("[name=" + key + "]").val(data[key]);
                    }
                    $("#savepatient").off("click").on("click", function (e) {
                        var instance = $('#detailform').parsley();
                        instance.validate();
                        if (instance.isValid()) {
                            jsondata = $('#detailform').serializeJSON();
                            updatePatient(jsondata, data.id);
                        }

                    })
                })



            });
        });
    }

    $("#addpatient").click(function () {
        $('#detailform input,textarea').val("");
        $('#myModal').modal().one('shown.bs.modal', function (e) {
            $("#savepatient").off("click").on("click", function (e) {
                var instance = $('#detailform').parsley();
                instance.validate();
                if (instance.isValid()) {
                    jsondata = $('#detailform').serializeJSON();
                    console.log(jsondata);
                    addPatient(jsondata);
                }

            })

        })
    })

    getPatient();
});