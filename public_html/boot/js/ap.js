$(document).ready(function () {

    var table;


    function addAppointment(data) {

        var dataItems = {
            "async": true,
            "crossDomain": true,
            "url": "appointments",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "2612534b-9ccd-ab7e-1f73-659029967199"
            },
            "processData": false,
            "data": JSON.stringify(data)
        }

        $.ajax(dataItems).done(function (response) {
            $.notify("Appointment Added Successfully", { "status": "success" });

            $('.modal').modal('hide')
            table.destroy();
            $('#datatable4 tbody').empty(); // empty in case the columns change
            getAppointment()
        });

    }

    function deleteAppointment(id) {
        var dataItems = {
            "async": true,
            "crossDomain": true,
            "url": "appointment/" + id,
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
            $.ajax(dataItems).done(function (response) {
                swal("Deleted!", "Appointment has been deleted.", "success");
                table.destroy();
                $('#datatable4 tbody').empty(); // empty in case the columns change
                getAppointment()
            });


        });

    }



    function getAppointment() {
        var dataItems = {
            "async": true,
            "crossDomain": true,
            "url": "appointments",
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(dataItems).done(function (response) {

            for (i = 0; i < response.length; i++) {
                response[i].fullname = response[i].first_name + " " + response[i].last_name
                response[i].fullname = response[i].first_name + " " + response[i].last_name
            }



            table = $('#datatable4').DataTable({
                "bDestroy": true,
                'paging': false, // Table pagination
                'ordering': true, // Column ordering
                'info': true, // Bottom left status text
                aaData: response,
                "aaSorting": [],
                aoColumns: [
                    {
                        mData: 'fullname'
                    },
                    {
                        mData: 'fullname'
                    },
                    {
                        mData: 'date'
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
                console.log(data)
                deleteAppointment(data.id)

            });


        });


    }

    $("#addpatient").click(function () {

        $('#myModal').modal().one('shown.bs.modal', function (e) {

            $("#doctor_select").html(doctorSelect)
            $("#patient_select").html(patientSelect)

            $(".form_datetime").datetimepicker({
                format: 'yyyy-mm-dd hh:ii:ss',
                startDate: new Date(),
                initialDate: new Date()
            });
            $("#savethepatient").off("click").on("click", function (e) {


                var instance = $('#detailform').parsley();
                instance.validate()
                if (instance.isValid()) {
                    jsondata = $('#detailform').serializeJSON();
                    addAppointment(jsondata)
                }

            })

        })



    })


    var doctorSelect = ""
    function getDoctor() {

        var dataItems = {
            "async": true,
            "crossDomain": true,
            "url": "doctors",
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(dataItems).done(function (response) {

            for (i = 0; i < response.length; i++) {

                response[i].fullname = response[i].first_name + " " + response[i].last_name
                doctorSelect += "<option value=" + response[i].id + ">" + response[i].fullname + "</option>"
            }


        })
    }
    var patientSelect = ""
    function getPatient() {

        var dataItems = {
            "async": true,
            "crossDomain": true,
            "url": "patients",
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(dataItems).done(function (response) {
            for (i = 0; i < response.length; i++) {
                response[i].fullname = response[i].first_name + " " + response[i].last_name
                patientSelect += "<option value=" + response[i].id + ">" + response[i].fullname + "</option>"
            }

        })
    }

    getDoctor()
    getPatient()
    getAppointment();
})