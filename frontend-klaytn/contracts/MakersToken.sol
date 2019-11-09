pragma solidity ^0.5.6;

// import "./ERC721/ERC721.sol";
// import "./ERC721/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract MakersToken is ERC721Full {

    event MakersUploaded
    (uint256 indexed tokenId, string photo, string title, string description, int targetKlay, string D_day, int price, uint256 timestamp);

    constructor(string memory name, string memory symbol) ERC721Full(name, symbol) public {}

    // Makers 배열
    mapping (uint256 => Makers) public _MakersList; 

    // Makers 마다 모금액 -> 최종 모금액이 얼마인지 확인 하기위해 필요한 mapping
    mapping (uint256 => int) public _totalKlayList;

    // 나의 MakersList
    mapping (address => uint256[]) public _MyMakersList;

    // 참여한 MakerList
    mapping (address => uint256[]) public _MyMakers;

    // 중복 참여 방지를 위한 mapping
    mapping (uint256 => address[]) public _investMakersList;
    
    struct Makers{
        uint256 tokenId;                    // ERC721 Makers
        address[] buyer;                    // 해당 Makers의 구매자 배열
        string photo;                        // 사진
        string title;                       // 제목
        string description;                 // 내용
        int targetKlay;                     // 목표금액
        string D_day;                       // 마감일
        int status;                     // Makers 상태 -> 0 : 종료 / 1 : 진행 / 2 : 목표금액 달성 및 종료
        uint256 timestamp;                      
        uint256 count;                      // Makers 참여자 수.
        int price;                          // Makers 공동 구매 가격
    }

    // --------------------------------------------------
    // Makers 업로드 (완료)
    // --------------------------------------------------

    function uploadMakers
    (string memory photo, string memory title, string memory description, int targetKlay,  string memory D_day, int price) public {
        uint256 tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);

        address[] memory buyer;

        Makers memory newMakers = Makers({
            tokenId : tokenId, 
            buyer : buyer, // 투자자들
            photo : photo, // 사진
            title : title, // 제목
            description : description, // 설명
            targetKlay : targetKlay, // 목표 금액
            D_day : D_day, // 마감일
            status : 1, // 투자 상태 -> 0 이면 종료 / 1 이면 진행 / 2 이면 목표금액 달성된 메이커스.
            count : 0,
            price : price,
            timestamp : now
        });

        _MakersList[tokenId] = newMakers;
        _MyMakersList[msg.sender].push(tokenId);

        emit MakersUploaded(tokenId, photo, title, description, targetKlay, D_day, price, now);
    }

    // ----------------------------------------------------------------------------------------------------------------------------------
    // Makers TargetKlay 불러오기 (명수)
    // ----------------------------------------------------------------------------------------------------------------------------------

    function showTargetKlay(uint256 tokenId) public view returns (int) {
        // require(msg.sender == ownerOf(tokenId), "This function can access only owner of Token");
        return _MakersList[tokenId].targetKlay;
    }

    // ----------------------------------------------------------------------------------------------------------------------------------
    // 메이커스 전체 불러오기 (완료)
    // ----------------------------------------------------------------------------------------------------------------------------------

    function getTotalMakersCount () public view returns (uint) {
        return totalSupply();
    }

    // ----------------------------------------------------------------------------------------------------------------------------------
    // 현재 모금액 얼마인지 확인하는 함수 (완료)
    // ----------------------------------------------------------------------------------------------------------------------------------

    function parentStateMakers(uint256 tokenId) public view returns (int) {
        return _totalKlayList[tokenId];
    }

    // ----------------------------------------------------------------------------------------------------------------------------------
    //  메이커스 불러오기 (완료)
    // ----------------------------------------------------------------------------------------------------------------------------------

    function getMakers (uint256 tokenId) public view
    returns(uint256, string memory, string memory, string memory, int, string memory, int) {
        return (
            _MakersList[tokenId].tokenId,
            _MakersList[tokenId].photo,
            _MakersList[tokenId].title,
            _MakersList[tokenId].description,
            _MakersList[tokenId].price,
            _MakersList[tokenId].D_day,
            _MakersList[tokenId].status
        );
    }

    // ----------------------------------------------------------------------------------------------------------------------------------
    // 메이커스 마감 시, 환불 함수 (완료)
    // ----------------------------------------------------------------------------------------------------------------------------------


    function returnklay(address addressID) public payable{
        address payable payableTokenSeller = address(uint160(addressID));
        payableTokenSeller.transfer(msg.value);
        
    }

    // ----------------------------------------------------------------------------------------------------------------------------------
    // 중복 방지 함수
    // ----------------------------------------------------------------------------------------------------------------------------------

    function prohibitOverlap(uint256 tokenId) public view returns (bool) {
        uint256[] memory arrayList = _MyMakers[msg.sender];
        for(uint256 i = 0; i<arrayList.length; i++) {
            if(tokenId == arrayList[i]) {
                return false; // 이미 투자함.
            }
        }
        return true;
    }
    

    // ----------------------------------------------------------------------------------------------------------------------------------
    // 메이커스 투자하기. (완료)
    // ----------------------------------------------------------------------------------------------------------------------------------

    function investMakers(uint256 tokenId) public payable {  
        int price = _MakersList[tokenId].price;
        require(msg.sender != ownerOf(tokenId), "메이커스 당사자는 투자못함.");
        require(_MakersList[tokenId].targetKlay >= _totalKlayList[tokenId],"모금 금액을 모두 달성함");
        _MakersList[tokenId].count += 1;
        _investMakersList[tokenId].push(msg.sender);
        address MakersOwner = ownerOf(tokenId);
        address payable payableTokenSeller = address(uint160(MakersOwner));
        payableTokenSeller.transfer(msg.value); // 메이커스 Token의 owner 계정으로 klay 송금
        _totalKlayList[tokenId] += price; // 메이커스 목표 금액을 다루는 list에 klay 추가
        _MakersList[tokenId].buyer.push(msg.sender); // 메이커스 투자자들 push
        _MyMakers[msg.sender].push(tokenId); // 내가 투자한 메이커스 
    }

    // ----------------------------------------------------------------------------------------------------------------------------------
    // 투자자 확인 함수. (완료)
    // ----------------------------------------------------------------------------------------------------------------------------------

    function showInvestor(uint256 tokenId) public view returns(address[] memory) {
        return _MakersList[tokenId].buyer;
    }

    // ----------------------------------------------------------------------------------------------------------------------------------
    // Klay 송금  (제품 구매 로직)
    // ----------------------------------------------------------------------------------------------------------------------------------

    function purchaseToken(address walletAddress, uint256 price) public payable returns (bool) {
        require(msg.value >= price, "caller sent klay lower than price");
        address payable payableTokenSeller = address(uint160(walletAddress));
        payableTokenSeller.transfer(msg.value);
        return true;
     }

     // ----------------------------------------------------------------------------------------------------------------------------------
     //  Makers 마감 확인 함수
     // ----------------------------------------------------------------------------------------------------------------------------------

     function checkMakersStatus(uint256 tokenId) public view returns (int) {
         return _MakersList[tokenId].status;
     }

    // ----------------------------------------------------------------------------------------------------------------------------------
    // My Makers List 불러오기. (참여)
    // ----------------------------------------------------------------------------------------------------------------------------------

    function showMyMakers_cutsomer(address Id) public view returns (uint256[] memory) {
        return _MyMakers[Id];
    }

    // ----------------------------------------------------------------------------------------------------------------------------------
    // My Makers List 불러오기. (운영)
    // ----------------------------------------------------------------------------------------------------------------------------------

    function showMyMakers(address Id) public view returns (uint256[] memory) {
        return _MyMakersList[Id];
    }

    // ------------------------------------------------------------------------
    // Makers Price 불러오기
    // ------------------------------------------------------------------------

    function showMakersPrice(uint256 tokenId) public view returns (int) {
        return _MakersList[tokenId].price;
    }

    // ------------------------------------------------------------------------
    // Makers state 불러오기
    // ------------------------------------------------------------------------

    function showMakersState(uint256 tokenId) public view returns(int) {
        int result = _MakersList[tokenId].status;
        if (result == 0) {
            return 0;
        } else if (result == 2){
            return 2;
        } else {
            return 1;
        }
    }

    // ------------------------------------
    // Makers 강제 마감
    // ------------------------------------

    function forcedClosure(uint256 tokenId) public payable {
        require(msg.sender == ownerOf(tokenId));
        _MakersList[tokenId].status = 0;
    }
}
